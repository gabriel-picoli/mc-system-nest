import styled from 'styled-components'

const StyledInput = styled.input<{ width?: string; marginRight?: string }>`
   width: ${(props) => props.width || '100%'};
   height: 45px;
   background-color: transparent;
   border: 2px solid #c1e3e3;
   border-radius: 5px;
   padding: 10px;
   font-size: 14px;
   color: ${(props) => props.theme.colors.black};
   margin-right: ${(props) => props.marginRight || '0px'};
   outline: none;

   &::placeholder {
      color: #999;
   }
`

interface InputProps {
   width?: string
   marginRight?: string
   placeholder: string
   type: string
   id: string
   value: string
   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Input({ width, marginRight, type, id, placeholder, value, onChange }: InputProps) {
   return (
      <StyledInput
         width={width}
         marginRight={marginRight}
         type={type}
         id={id}
         placeholder={placeholder}
         value={value}
         onChange={onChange}
      />
   )
}
