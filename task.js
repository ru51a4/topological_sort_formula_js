
class formulaTask {
    static lex(str) {
        let res = [];
        let t = '';
        for (let i = 0; i <= str.length - 1; i++) {
            if (str[i] === ' ') {
                continue
            }
            if (str[i] === '%' || str[i] === '/' || str[i] === '*' || str[i] === '-' || str[i] === '+' || str[i] === '(' || str[i] === ')') {
                if (t) {
                    res.push(t);
                }
                res.push(str[i]);
                t = '';
            } else {
                t += str[i];
            }
        }
        if (t) {
            res.push(t);
        }
        return res;
    }
    static build(str) {
        let nodes = [];
        let str_nodes = [];
        str = str.split("\n")
        for (let i = 0; i <= str.length - 1; i++) {
            let c = {};
            let _c = str[i].split("=")
            c["path"] = formulaTask.lex(_c[1]);
            c["sort"] = 0;
            str_nodes.push(_c[0].trim());
            nodes[_c[0].trim()] = c
        }
        for (const f in nodes) {
            for (let i = 0; i <= nodes[f]["path"].length - 1; i++) {
                if (str_nodes.includes(nodes[f]["path"][i])) {
                    nodes[f]["path"][i] = nodes[nodes[f]["path"][i]]
                }
            }
        }
        return nodes
    }

    static sort(nodes) {
        /*
        Если вершина чёрная, ничего делать не надо.
        Если вершина серая — найден цикл, топологическая сортировка невозможна.
        Если вершина белая
                Красим её в серый
                Применяем шаг алгоритма для всех вершин, в которые можно попасть из текущей
                Красим вершину в чёрный и помещаем её в начало окончательного списка
        */
        let res = [];
        let deep = (node) => {
            if (node["sort"] == 3) {
                return
            }
            if (node["sort"] == 1) {
                throw new Error('circle');
            }
            if (node["sort"] == 0) {
                node["sort"] = 1
            }
            node["path"]?.forEach((node) => {
                if (!(typeof node === 'string' || typeof node === 'number')) {
                    deep(node)
                }
            });
            node["sort"] = 3
            res.push(node)
        }
        for (let p in nodes) {
            deep(nodes[p])
        }
        return res;
    }

}
console.log(formulaTask.sort(formulaTask.build(`V = S*h / 3
S = a * b
a = 10
b = 15
h = (a + b) / 2`)));