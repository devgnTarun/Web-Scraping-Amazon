import Image from "next/image"

interface Props {
    title : string,
    icon : string,
    value : string,
}

const PriceInfoCard = ({title, icon, value }: Props) => {
  return (
    <div className={`price-info_card`}>
        <p className="text-base text-black-100">
            {title}
        </p>
        <div className="flex gap-1">
            <Image src={icon} width={24} height={24} alt={title}/>
            <p className="text-2xl font-bold text-secondary">
                {value}
            </p>
        </div>
    </div>
  )
}

export default PriceInfoCard