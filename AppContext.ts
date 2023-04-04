import React from "react";
import { createContext } from 'react';

const context = {
  songId: null,
  setSongId: (id: string) => {}
}

export const AppContext = createContext(context);