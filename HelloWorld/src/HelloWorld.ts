/** @format */

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
