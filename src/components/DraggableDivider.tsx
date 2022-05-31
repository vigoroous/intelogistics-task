import { FC, RefObject } from "react";
import { DashOutlined } from "@ant-design/icons";
import { useDrag } from "@use-gesture/react";

type Props = {
    outerDiv: RefObject<HTMLDivElement>;
}
const DraggableDivider: FC<Props> = ({outerDiv}) => {
    const bind = useDrag(({delta: [dx]}) => {
        if (!outerDiv.current) return;
        const currentWidth = outerDiv.current.clientWidth;
        outerDiv.current.style.width = `${currentWidth + dx}px`;
    }, {
        axis: 'x',
        bounds: {left: -600, right: 600}
    });
    
    return (
        <div
            {...bind()}
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'flex-end',
                height: '100%',
                cursor: 'grab'
            }}
        >
            <DashOutlined />
        </div>
    );
}

export default DraggableDivider;