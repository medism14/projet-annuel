const Input = ({placeholder, type}: any) => {
    return (
        <input className={`text-[--tertiary-color] bg-[--secondary-color] border-2 border-[--tertiary-color] h-[2rem] rounded-md outline-none w-full p-3 py-4`} type={type} placeholder={placeholder} />
    );
}

export default Input