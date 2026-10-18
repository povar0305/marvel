/**
 * Функция для получения иконки гендера
 * @param gender
 */
export const getIconGender = (gender: string) => {
  const iconsByGender = {
    Мужчина: 'material-symbols:male-rounded',
    Женщина: 'material-symbols:female-rounded',
    Другое: 'material-symbols:question-mark-rounded',
  }

  return iconsByGender[gender as keyof typeof iconsByGender] || iconsByGender['Другое']
}

