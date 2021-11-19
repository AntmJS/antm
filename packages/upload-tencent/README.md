# @antmjs/upload-tencent

npm install @antmjs/upload-tencent -g --registry=https://npm.xiaodiankeji.net

### 配置
##### 注：在执行该脚本的目录需要添加antm.config.js文件

```javascript
module.exports = {
  uploadTencent: {
    CDN: 'x.xx.com',
    SecretId: '',
    SecretKey: '',
    Bucket: '',
    Region: '',
  }
}
```

### 资源上传
##### 注：会自动生成随机串作为目录以防资源被覆盖
antm-upload-tencent upload --help

antm-upload-tencent upload --file-path ./a.png [--exclude-regexp "(.+?).map"]

antm-upload-tencent upload --dir ./  [--exclude-regexp "(.+?).map"]

### Bundle上传
##### 注：通过--target-dir作为目录以防资源被覆盖

antm-upload-tencent bundle --help

antm-upload-tencent bundle --target-dir \`static/${process.env.API_ENV}/${pkg.name}/${process.env.DEPOLY_VERSION}\` --dir \`./build\` [--exclude-regexp "(.+?).map"]