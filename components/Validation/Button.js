//font import
import {Rubik} from 'next/font/google'

//next link

//components

const rubikBold = Rubik({
  subsets: ['latin'],
  variable: '--font-rubik',
  weight: ['700'],
})

const rubikRegular = Rubik({
  subsets: ['latin'],
  variable: '--font-rubik',
  weight: ['400'],
})

const Button = ({itemComponents, handle, style}) => {
  return (
    <div
      className={
        style
          ? style
          : `${rubikRegular.variable} button flex max-h-40 flex-row justify-center rounded-2xl border-2 border-solid border-secondary bg-secondary p-2 font-rubik text-white hover:cursor-pointer hover:bg-transparent hover:text-opposite`
      }
      onClick={handle ? handle : null}>
      {itemComponents ? itemComponents : 'empty'}
    </div>
  )
}

export default Button
