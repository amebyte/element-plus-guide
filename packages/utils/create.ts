// block 代码块 element 元素 modifier 装饰 state 状态

function _ben(prefixName: string, blockSuffix: string, element: string, modifier: string) {
    if(blockSuffix) {
        prefixName += `-${blockSuffix}`
    }
    if(element) {
        prefixName += `__${element}`
    }
    if(modifier) {
        prefixName += `--${modifier}`
    }
    return prefixName
}

function createBEM(prefixName: string) {
    const b = (blockSuffix: string = '') => _ben(prefixName, blockSuffix, '', '')
    return {
        b
    }
}

function createNamespace(name: string) {
    const prefixName = `z-${name}`
    return createBEM(prefixName)
}

const bem = createNamespace('icon')

console.log(bem.b('button'))