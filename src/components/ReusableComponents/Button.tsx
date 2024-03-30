const Button = ({value, onClick, restClass}: any) => {
    return (
        <button
            onClick={onClick}
            className={`
                text-lg px-2 py-1
                md:text-xl md:px-2 md:py-1
                lg:text-base lg:px-3 lg:py-1
                bg-[--primary-color] text-[--secondary-color] transtiion-all duration-300 hover:text-[--tertiary-color] rounded-xl ${restClass}
            `}>{value}</button>
    );
}

export default Button;