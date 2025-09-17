const fs = require('fs');

const SITE_BASE_URL = 'https://vxetable.cn';
const VXE_VERSION = 3;

function getMethodName(item) {
  const { name } = item;
  const idx = name.indexOf('(');
  return name.slice(0, idx);
}

async function getSystemVersion() {
  const res = await fetch(`${SITE_BASE_URL}/component-api/system-config.json`);
  const data = await res.json();
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
      `/** 自动生成文件，不需要修改! */\nexport default '${methodsStr}';\n`
    );
  }
}

writeMethodsToFile();
