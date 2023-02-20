// Dependencies
import { FC, ReactNode }from 'react'

// Layout component
export const GeneralLayout: FC<{ children: ReactNode }> = ({ children }) => {
  // JSX for PWA
  return (
    <div>
      {children}
    </div>
  )  
}
