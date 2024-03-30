"use client"
import React from 'react';

const DivInput = ({children}: any) => {

    const childrenCount = React.Children.count(children);

    if (childrenCount == 1) {
        return (
            <div className="bg-inherit w-full flex justify-center mt-8">
                {/* {React.Children.map(children, (child) => (
                    child.
                ))} */}
                    {children}
            </div>
        );
    }
    
    return (
        <div className="bg-inherit flex flex-col space-y-8 md:space-y-0 md:flex-row md:justify-center md:space-x-5 mt-8 md:mt-0">
            {children}
        </div>
    );
}

export default DivInput;