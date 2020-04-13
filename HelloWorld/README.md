# notadd Hello World 项目

## 1,ts环境配置

在tsconfig.json中开启experimentalDecorators和emitDecoratorMetadata配置

``` file
"experimentalDecorators": true,
"emitDecoratorMetadata": true,
```

## 2,创建AppModule

### 安装@notadd/graphql库

### 安装@notadd/apollo-fastify库(网络服务库)

### 安装@notadd/ast.ts-graphql(graphql配置文件自动生成库,仅开发时使用),所有需要代码扫描的源文件所在目录需要配置到tsconfig.json中的"include": ["src"]

``` bash
yarn add @notadd/graphql
yarn add @notadd/apollo-fastify
yarn add @notadd/ast.ts-graphql --dev
```

### 依赖注入Fastify模块和grpphql模块

``` typescript
import { ApolloFastifyModule } from '@notadd/apollo-fastify';
import { GraphqlModule } from '@notadd/graphql';

@Module({
    imports: [ApolloFastifyModule, GraphqlModule.forDefault((i) => i)],
})
class AppModule implements OnModuleInit {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    ngOnModuleInit() {
        console.log(`模块初始化完成`);
    }
}
```

## 3,启动设置(node环境)

### 安装@notadd/core库

### 安装@notadd/platform-node库

``` bash
yarn add @notadd/core
yarn add @notadd/platform-node
```

### platformNode表示使用node平台启动

### MAIN_PATH,需要在platformNode中被设置为启动文件的路径__filename,notadd框架将在此文件目录搜索.evn文件,并初始化环境变量,使用graphql时,notadd框架自动生成的graphql配置文件将从此文件进行搜索

### PLATFORM_NAME为网页名称,更多参数配置请查阅文档

### 启动bootstrapModule的参数必须为@Module类修饰符修饰的类,即第二部准备的AppModule类

``` typescript
import { MAIN_PATH,PLATFORM_NAME } from '@notadd/core';

platformNode([
    {
        provide: MAIN_PATH,
        useValue: __filename,
    },
    {
        provide: PLATFORM_NAME,
        useValue: 'Hello World',
    },
])
    .bootstrapModule(AppModule)
    .then(
        async (res): Promise<void> => {
            console.log(res);
            console.log(`启动初始化完成`);
        },
    );
```

## 4.编写HelloWorld的API

### 编写API文件HelloWorld.ts

### @Controller类修饰符修饰的HelloWorld,只有在请求时,类才被实例化,并且处理API逻辑,请求处理万,类实例被自动释放

### @Query()与@Args为graphql相关修饰符

``` typescript
/* HelloWorld.ts */
import { Controller } from '@notadd/core';
import { Query, Args } from '@notadd/graphql';

interface Output {
    /**
     * HelloWorld 返回信息
     */
    message: string;
}

interface Input {
    /**
     * Hello World 请求信息
     */
    name: string;
}

@Controller()
export class HelloWorld {
    @Query()
    async helloworld(@Args('input') input: Input): Promise<Output> {
        return { message: `${input.name} Hello World!` };
    }
}

```

## 5 HelloWorld注入到AppModule中

``` typescript
import { HelloWorld } from 'HelloWorld';

@Module({
    imports: [ApolloFastifyModule, GraphqlModule.forDefault((i) => i)],
    controllers: [HelloWorld],
})
class AppModule implements OnModuleInit {
    async ngOnModuleInit(): Promise<void> {
        console.log(`模块初始化完成`);
    }
}
```

### 目录结构,index.graphql文件是代码运行时自动生成的graphql配置文件

``` bash
├── package.json
├── README.md
├── src
│   ├── HelloWorld.ts
│   ├── index.graphql
│   └── index.ts
└── tsconfig.json
```
