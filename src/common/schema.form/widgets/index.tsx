import { TextBoxWidget } from "./input";
import { ToggleWidget } from "./toggle";
import { NullWidget } from "./null";
import { NumberWidget } from "./number";
import { ComboBoxWidget } from "./combobox";
import { ChoiceGroupWidget } from "./choice";
import { DatePickerWidget } from "./date";
import { CodeWidget } from "./code";
import { EChartWidget } from "./echart";
import { ImageWidget } from "./image";

export default {
    string: TextBoxWidget,
    boolean: ToggleWidget,
    text: TextBoxWidget,
    toggle: ToggleWidget,
    null: NullWidget,
    number: NumberWidget,
    integer: NumberWidget,
    combobox: ComboBoxWidget,
    select: ComboBoxWidget,
    choice: ChoiceGroupWidget,
    date: DatePickerWidget,
    code: CodeWidget,
    echart: EChartWidget,
    image: ImageWidget
};
