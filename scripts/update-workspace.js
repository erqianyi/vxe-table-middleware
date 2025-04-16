const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// 获取当前版本号
const packageJson = require('../package.json');
const version = packageJson.version;

// 读取 pnpm-workspace.yaml 文件
const workspacePath = path.resolve(__dirname, '../pnpm-workspace.yaml');
const workspaceContent = fs.readFileSync(workspacePath, 'utf8');

// 解析 YAML
const workspaceYaml = yaml.load(workspaceContent);

// 更新版本号
if (
  workspaceYaml.catalog &&
  workspaceYaml.catalog['@2100/vxe-table-middleware']
) {
  workspaceYaml.catalog['@2100/vxe-table-middleware'] = `^${version}`;

  // 写回文件
  fs.writeFileSync(
    workspacePath,
    yaml.dump(workspaceYaml, {
      lineWidth: -1, // 保持原有格式
      noRefs: true,
    }),
    'utf8'
  );

  console.log(
    `已更新 pnpm-workspace.yaml 中 @2100/vxe-table-middleware 的版本号为 ^${version}`
  );
} else {
  console.error(
    '在 pnpm-workspace.yaml 中未找到 @2100/vxe-table-middleware 配置'
  );
  process.exit(1);
}
