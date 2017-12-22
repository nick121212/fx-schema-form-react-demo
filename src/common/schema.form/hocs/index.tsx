
import { hocFactory } from "fx-schema-form-react";
import ExtraFieldHoc from "./field";
import TargetHoc from "./target";
import ExtraTempHoc from "./temp";
import OptHoc from "./opt";
import ProxyHoc from "./proxy";
import ConditionHoc from "./condition";
import ShHoc from "./sh";
import OneOfHoc from "./oneof";
import CustomHoc from "./custom";
import DndHoc from "./dnd";
import DsModelHoc from "./dsmodel";
import JsonataHoc from "./jsonata";
import JsonataHoc1 from "./jsonata1";

export default {
    extraField: ExtraFieldHoc.bind(ExtraFieldHoc, hocFactory),
    target: TargetHoc.bind(TargetHoc, hocFactory),
    extraTemp: ExtraTempHoc.bind(ExtraTempHoc, hocFactory),
    opt: OptHoc.bind(OptHoc, hocFactory),
    proxy: ProxyHoc.bind(ProxyHoc, hocFactory),
    con: ConditionHoc.bind(ConditionHoc, hocFactory),
    sh: ShHoc.bind(ShHoc, hocFactory),
    oneof: OneOfHoc.bind(OneOfHoc, hocFactory),
    custom: CustomHoc.bind(CustomHoc, hocFactory),
    dnd: DndHoc.bind(DndHoc, hocFactory),
    dsmodel: DsModelHoc.bind(DsModelHoc, hocFactory),
    jsonata: JsonataHoc.bind(JsonataHoc, hocFactory),
    jsonata1: JsonataHoc1.bind(JsonataHoc1, hocFactory),
};

