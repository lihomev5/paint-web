
module.exports = {
    plugins:[
      '@babel/plugin-transform-runtime',
    ],
    presets: [
      [
        "@babel/preset-env",
        {
          "useBuiltIns": "entry",
        }
      ],
      '@vue/app'
    ]
  }
// /**
//  * @type { import('@babel/core').TransformOptions }
//  */
// module.exports = {
//     presets: [
//         // '@vue/cli-plugin-babel/preset',
//         [
//             "@vue/cli-plugin-babel/preset",
//             {
//                 useBuiltIns: "entry",   //新增修改内容
//             },
//         ], 
//     ],
//     plugins: [
//         [
//             "import",
//             {
//                 libraryName: "vant",
//                 libraryDirectory: "es",
//                 style: true,
//             },
//         ],
//     ],
// }
    
