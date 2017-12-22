import col from "./col";
import row from "./row";
import div from "./div";
import echart from "./echart";
import bar from "./bar";
import line from "./line";
import image from "./image";

const children: any[] = [
    row,
    col,
    bar,
    image
];

export default children;

const map = {

};

children.concat([div]).forEach((child: any) => {
    map[child.label] = child;
});

export { map };
