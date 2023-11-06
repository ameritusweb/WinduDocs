import dslRules from '../examples/dsl-rules.json'
import kitchenSink from '../examples/kitchen-sink.json'
import { Rule } from '../interfaces';
import { ASTFactory } from './ast-factory'

export function parseDsl() {

    const factory = new ASTFactory(dslRules as Rule[]);
    factory.buildAST(kitchenSink);
}