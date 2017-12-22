import React, { SyntheticEvent } from "react";
import { SchemaFormItemProps } from "fx-schema-form-react";

import { Image, ImageCoverStyle, ImageFit } from "office-ui-fabric-react/lib/Image";

export interface Props extends SchemaFormItemProps {
}

export class ImageWidget extends React.Component<Props, any> {

    public render(): JSX.Element {
        const { mergeSchema, getTitle, getWidgetOptions } = this.props;
        const { uiSchema = {}, keys } = mergeSchema;
        const widgetOptions = getWidgetOptions("image");
        let { title, className, srcs, ...options } = this.setDefaultProps();

        return <div className={"relative " + className}>
            {
                srcs ? srcs.map((src: string, index: number) => {
                    return <Image title={title}
                        key={index}
                        coverStyle={ImageCoverStyle.portrait}
                        imageFit={ImageFit.contain}
                        maximizeFrame={true}
                        shouldFadeIn={true}
                        className={className}
                        {...widgetOptions}
                        {...options }
                        src={src}
                    />;
                }) : null
            }

            <textarea className="absolute bg-white o-50 w-100 tr pa1 f3" style={{
                top: 0,
                right: 0,
                left: 0,
                outline: "none",
                border: "none",
                resize: "none"
            }} readOnly value={title}></textarea>
        </div>;
    }

    private setDefaultProps(): any {
        const { mergeSchema } = this.props;
        const props: any = {};

        if (this.props.formItemData !== undefined) {
            const data = this.props.formItemData.toJS();

            props.srcs = data.srcs;
            props.style = data.style;
            props.className = data.className;
            props.title = data.title;
            props.imageFit = data.imageFit;
        }

        return props;
    }
}
