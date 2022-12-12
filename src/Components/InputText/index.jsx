import './styles.css'

export const TextInput = ({ handlerChange, searchValue }) => {
    return (
        <input
            className="text-input"
            onChange={handlerChange}
            value={searchValue}
            type="search"
            placeholder="Busque um card pelo título"
        />        
    );    
}