
export interface Question {
  id: number;
  text: string;
  image: string;
  bgImage: string;
}

export interface GameState {
  currentQuestionIndex: number;
  yesButtonSize: number;
  isCompleted: number;
}
