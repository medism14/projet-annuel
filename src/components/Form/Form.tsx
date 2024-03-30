import Button from "../ReusableComponents/Button";

const Form = ({title, children, onClick, buttonValue}: any) => {
    return (
        <form className="m-0 p-0" onSubmit={onClick}>
        <div className="flex flex-col items-center w-[90%] md:[80%] lg:w-[70%] pb-5 bg-[--secondary-color] mx-auto">
            <div className="bg-[--primary-color] text-[--secondary-color] w-full text-center rounded-lg rounded-b-none py-4 font-bold text-xl md:text-4xl lg:text-2xl">
                {title}
            </div>
            <div className="
                px-[2rem]
                md:px-[4rem]
                lg:px-[10rem]
                flex-1 flex flex-col bg-inherit w-full items-center py-5 rounded-b-lg">
                {children}
            </div>
                <Button value={buttonValue} restClass={`mt-5`}/>
        </div>
        </form>
    );
}

export default Form;