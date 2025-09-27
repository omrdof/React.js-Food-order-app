export default function Input({label, id, name, ...props}) {
    
    return(
        <p className="control">
            <label htmlFor={id}>{label}</label>
            <input id={id} name={name} required {...props} />
        </p>

    )
}