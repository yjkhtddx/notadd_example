module.exports={
    parser:'@typescript-eslint/parser',//定义ESLint的解析器
    extends: [
        'plugin:react/recommended',//使用推荐的React代码检测规范
        'plugin:@typescript-eslint/recommended',//定义文件继承的子规范
        'prettier/@typescript-eslint',//使得@typescript-eslint中的样式规范失效，遵循prettier中的样式规范
        'plugin:prettier/recommended'//使用prettier中的样式规范，且如果使得ESLint会检测prettier的格式问题，同样将格式问题以error的形式抛出
    ],
    plugins: ['@typescript-eslint'],//定义了该eslint文件所依赖的插件
    settings: {             //自动发现React的版本，从而进行规范react代码
        "react": {
            "pragma": "React",
            "version": "detect"
        }
    }, 
    parserOptions: {        //指定ESLint可以解析JSX语法
        "ecmaVersion": 2019,
        "sourceType": 'module',
        "ecmaFeatures":{
            jsx:true
        }
    },
    env:{                          //指定代码的运行环境
        browser: true,
        node: true,
    },
    rules:{
        // @fixable 必须使用 === 或 !==，禁止使用 == 或 !=，与 null 比较时除外
        'eqeqeq':[
            'error',
            'always',
            {
                null:'ignore'
            }
        ]
        // // 类和接口的命名必须遵守帕斯卡命名法，比如 PersianCat
        // 'typescript/class-name-casing':'error'
    }
}