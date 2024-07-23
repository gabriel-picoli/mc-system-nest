import styled from 'styled-components'

const StyledButton = styled.button<{
   backgroundColor?: string
   marginLeft?: string
   width?: string
   height?: string
   textColor?: string
   hoverBackgroundColor?: string
}>`
   border: none;
   background-color: ${(props) => props.backgroundColor || props.theme.colors.primary};
   margin-left: ${(props) => props.marginLeft || '0px'};
   transition: all 0.2s ease-in;
   border-radius: 10px;
   width: ${(props) => props.width || '150px'};
   height: ${(props) => props.height || '40px'};
   color: ${(props) => props.textColor || props.theme.colors.white};
   box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.288);
   cursor: pointer;

   &:hover {
      background-color: ${(props) => props.hoverBackgroundColor || '#4d9291c5'};
   }
`

const ButtonText = styled.p<{ textWidth?: string }>`
   font-size: 16px;
   width: ${(props) => props.textWidth || '100px'};
   font-weight: bold;
   color: inherit; // herda cor do elemento pai
`

interface ButtonProps {
   backgroundColor?: string
   hoverBackgroundColor?: string
   marginLeft?: string
   width?: string
   height?: string
   textWidth?: string
   textColor?: string
   onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
   type: 'button' | 'submit' | 'reset'
   children: string
}

export default function Button({
   backgroundColor,
   hoverBackgroundColor,
   marginLeft,
   width,
   height,
   textWidth,
   textColor,
   onClick,
   type,
   children,
}: ButtonProps) {
   return (
      <StyledButton
         backgroundColor={backgroundColor}
         hoverBackgroundColor={hoverBackgroundColor}
         marginLeft={marginLeft}
         width={width}
         height={height}
         textColor={textColor}
         onClick={onClick}
         type={type}
      >
         <ButtonText textWidth={textWidth}>{children}</ButtonText>
      </StyledButton>
   )
}
