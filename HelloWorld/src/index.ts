/** @format */
import { platformNode } from '@notadd/platform-node';
import { Module, OnModuleInit, MAIN_PATH, PLATFORM_NAME } from '@notadd/core';
import { HelloWorld } from './HelloWorld';
import { ApolloFastifyModule } from '@notadd/apollo-fastify';
import { GraphqlModule } from '@notadd/graphql';

@Module({
    imports: [ApolloFastifyModule, GraphqlModule.forDefault((i) => i)],
    controllers: [HelloWorld],
})
class AppModule implements OnModuleInit {
    async ngOnModuleInit(): Promise<void> {
        console.log(`模块初始化完成`);
    }
}

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
