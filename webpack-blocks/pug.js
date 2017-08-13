module.exports = pug

function pug(options) {
  options = options || {}

  const setter = (context) => ({
    module: {
      loaders: [
        {
          test: context.fileType('text/x-pug'),
          loaders: [
            'html-loader',
            {
              loader: 'pug-html-loader',
              query: Object.assign({}, {data: options}),
            },
          ],
        },
      ],
    },
  })

  return Object.assign(setter, { pre })
}

function pre(context) {
  const registeredTypes = context.fileType.all()
  if(!('text/x-pug' in registeredTypes)) {
    context.fileType.add('text/x-pug', /\.pug$/)
  }
}
