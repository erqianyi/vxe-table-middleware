/*
 * @Description: 如果中间件适配vxe-table版本变更且版本间存在methods差异，需要手动node运行一次该脚本
 */
const fs = require('fs');

const SITE_BASE_URL = 'https://vxetable.cn';
const VXE_VERSION = 3;
let currentVersion = '';

function getMethodName(item) {
  const { name } = item;
  const idx = name.indexOf('(');
  return name.slice(0, idx);
}

async function getSystemVersion() {
  const res = await fetch(`${SITE_BASE_URL}/component-api/system-config.json`);
  const vRes = await fetch(`${SITE_BASE_URL}/component-api/vxe-version.json`);
  const data = await res.json();
  const vMap = await vRes.json();
  currentVersion = vMap['vxe-table'][`v${VXE_VERSION}-latest`];
  return data[`v${VXE_VERSION}Version`];
}

async function getGridsMethods() {
  const version = await getSystemVersion();
  const res = await fetch(
    `${SITE_BASE_URL}/component-api/vxe-table-v${VXE_VERSION}/api/vxe-grid.json?v=?v=${version}`
  );
  const data = await res.json();
  if (data) {
    const methodObj = data.find((item) => item.name === 'Methods');
    if (methodObj) {
      return (methodObj.list || []).map((item) => getMethodName(item));
    }
  }
  return [];
}

async function writeMethodsToFile() {
  const methods = await getGridsMethods();
  if (methods.length > 0) {
    // 删除'./src/utils/methods-map.js'文件
    if (fs.existsSync('./src/utils/methods-map.js')) fs.unlinkSync('./src/utils/methods-map.js');
    const methodsStr = methods.join(',');
    fs.writeFileSync(
      './src/utils/methods-map.js',
      `/** 自动生成文件，不需要修改! vxe-table@${currentVersion} */\nexport default '${methodsStr}';\n`
    );
  }
}

writeMethodsToFile();
