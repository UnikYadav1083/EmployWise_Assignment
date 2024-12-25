function InputBox({heading,plchldr,onChange,value,type,size})
{
    return <div className="py-1">
        <div className="text-base font-bold text-left">{heading}</div>
        <input  onChange={onChange} className="w-full p-2 border-2 rounded" placeholder={plchldr} value={value} type={type} size={size}/>
    </div>
}
export default InputBox;