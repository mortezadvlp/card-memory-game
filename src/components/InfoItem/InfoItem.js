
import './InfoItem.css'

export default function InfoItem({ title, value, best = "" }) {

    return (
        <div className='info-item' >
            <div className='info-item-inner' >
                <div>
                    <span className='info-item-title' >{title}</span>
                    {best !== "" &&
                        <span className='info-item-best-title' >Best</span>
                    }
                </div>
                <div>
                    <span className='info-item-value' >{value}</span>
                    {best !== "" &&
                        <span className='info-item-best' >{best}</span>
                    }
                </div>
            </div>
        </div>
    );
}