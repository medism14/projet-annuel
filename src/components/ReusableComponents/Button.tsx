const Button = ({value, onClick, restClass}: any) => {

        <button
            onClick={onClick}
            className={`
                text-[0.6rem] px-2 py-1
                md:text-sm md:px-2 md:py-1
                lg:text-base lg:px-3 lg:py-1
                bg-[--primary-color] text-[--secondary-color] rounded-xl ${restClass}
            `}>{value}</button>
}

export default Button;