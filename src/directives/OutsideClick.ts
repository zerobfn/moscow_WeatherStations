import { DirectiveOptions } from 'vue'

const directive: DirectiveOptions = {
    inserted(el: any, node) {
        el.clickOutsideEvent = (event: any) => {
            const path = event.path || (event.composedPath && event.composedPath())
            if (path) {
                const result = path.find((x: any) => x.id === node.value.except)
                if (!result) {
                    node.value.callback(node.value.payload)
                }
            }
        }
        document.body.addEventListener('click', el.clickOutsideEvent)
    },
    unbind(el: any) {
        document.removeEventListener("click", el.clickOutsideEvent)
    }
}

export default directive