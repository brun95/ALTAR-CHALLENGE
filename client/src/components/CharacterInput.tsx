import React, { ChangeEvent } from 'react';

interface Props {
  onChange: (value: string) => void;
}

const CharacterInput: React.FC<Props> = ({ onChange }) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Character"
      maxLength={1}
      onChange={handleInputChange}
    />
  );
};

export default CharacterInput;