const MS_PATTERN_WIKI = 'role:wiki,cmd:*'

let Config = require('./wiki.config');
if (process.env.ENVIRONMENT === 'production') {
  Config = require('./wiki.config.prod');
}

require('seneca')()
  .use('kubernetes', { k8s_url: process.env.KUBERNETES_SERVICE_HOST })
  .use('./wiki.plugin')
  .ready(startMesh)

function startMesh () {
  const kubernetes = this.options().plugin.kubernetes;

  this
    .use('mesh', {
      pin: MS_PATTERN_WIKI,
      host: kubernetes.myip,
      bases: kubernetes.pods
        .filter(pod => pod.labels['seneca-base'] === 'yes')
        .filter(pod => pod.status === 'Running')
        .map(pod => `${pod.ip}:39000`)
    })
}
