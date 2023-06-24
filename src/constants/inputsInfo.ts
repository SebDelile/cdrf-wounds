import { InputType } from 'zlib';
import {
  inputElements,
  TYPE_CHECKBOX,
  TYPE_CHECKBOX_AND_VALUE,
  TYPE_NUMBER,
} from './inputElements';
import { inputsType } from './inputs';

export type inputImpliedChangesType = [
  keyof inputsType,
  (
    currentfield: boolean,
    impliedField: null | boolean | number
  ) => null | boolean | number
][];

export type inputDisabledType = [
  keyof inputsType,
  (fieldValue: null | boolean | number) => boolean
][];

export type inputInfoType = {
  type: (typeof inputElements)[number];
  label: string;
  description: string;
  disabled?: inputDisabledType;
  impliedChanges?: inputImpliedChangesType;
  range?: [number, number];
};

export type inputsInfoType = {
  [key in keyof inputsType]: inputInfoType;
};

export const INPUTS_INFO: inputsInfoType = {
  FORmoinsRES: {
    label: 'FOR moins RES',
    description:
      "La force (FOR) de l'agresseur moins la résistance (RES) de la victime.",
    type: TYPE_NUMBER,
  },
  double6Tue: {
    label: '6-6 = Tué net',
    description:
      'Si les dés du jet de blessure indiquent un double 6, le résultat est automatiquement Tué net.',
    type: TYPE_CHECKBOX,
  },
  //
  jetAmplifie: {
    label: 'Jet Amplifié',
    description:
      'Le jet de blessure est réalisé à 3 dés et seuls les 2 plus grands résultats sont conservés.',
    type: TYPE_CHECKBOX,
    disabled: [['jetAttenue', (fieldValue) => !!fieldValue]],
  },
  armeSacree: {
    label: 'Arme sacrée',
    description:
      'Si les dés du jet de blessure indiquent un double, le résultat est automatiquement Tué net.',
    type: TYPE_CHECKBOX,
    disabled: [['armureSacree', (fieldValue) => !!fieldValue]],
  },
  tirImmobile: {
    label: 'Tir immobile',
    description:
      'Le résultat du jet de blessure est lu une ligne plus bas dans le tableau, il ne peut pas dépasser la dernière ligne du tableau.',
    type: TYPE_CHECKBOX,
  },
  fleau: {
    label: 'Fléau/X',
    description:
      'Le résultat du jet de blessure est lu une ligne plus bas dans le tableau, il ne peut pas dépasser la dernière ligne du tableau.',
    type: TYPE_CHECKBOX,
  },
  feroce: {
    label: 'Féroce',
    description:
      "Si le résultat du jet de blessure indique 'Sonné', il est transformé en 'Blessure Légère'.",
    type: TYPE_CHECKBOX,
  },
  epeeHache: {
    label: 'Epée-hache',
    description:
      "Si le résultat du jet de blessure indique 'Blessure Critique', il est transformé en 'Tué net'.",
    type: TYPE_CHECKBOX,
  },
  vapeurFOR: {
    label: 'Vapeur/FOR',
    description:
      "L'agresseur bénéficie d'un bonus de FOR de +1 à +6 (résultat d'un dé). Toutes les possibilités sont calculées. L'incident sur un 1 au jet de vapeur n'est pas pris en compte.",
    type: TYPE_CHECKBOX,
  },
  toxique: {
    label: 'Toxique/X',
    description:
      "Si le résultats du jet de blessure est une 'Blessure Légère' ou mieux, un dé est lancé. Si le résultat est supérieur à X, une blessure légère est ajoutée au résultat, s'il est inférieur ou égal, une blessure grave est ajoutée au résultat.",
    type: TYPE_CHECKBOX_AND_VALUE,
    range: [0, 6],
  },
  //
  jetAttenue: {
    label: 'Jet Atténué',
    description:
      'Le jet de blessure est réalisé à 3 dés et seuls les 2 plus faibles résultats sont conservés.',
    type: TYPE_CHECKBOX,
    disabled: [['jetAmplifie', (fieldValue) => !!fieldValue]],
  },
  armureSacree: {
    label: 'Armure sacrée',
    description:
      "Si les dés du jet de blessure indiquent un double, le résultat est automatiquement 'Aucun effet' (prévaut sur Arme Sacrée).",
    type: TYPE_CHECKBOX,
    impliedChanges: [
      [
        'armeSacree',
        (newState, prevFieldState) => (newState ? false : prevFieldState),
      ],
    ],
  },
  durACuire: {
    label: 'Dur à cuire',
    description:
      'Le résultat du jet de blessure est lu une ligne plus haut dans le tableau, il ne peut pas dépasser la première ligne du tableau.',
    type: TYPE_CHECKBOX,
  },
  ethere: {
    label: 'Ethéré',
    description:
      "En cas de blessure ('Légère', 'Grave' ou 'Critique') Le résultat du jet de blessure est diminué d'un cran. Bénéficie de plus de Immunité/Sonné.",
    type: TYPE_CHECKBOX,
    impliedChanges: [['immuSonne', (newState) => newState]],
  },
  vulnerable: {
    label: 'Vulnérable',
    description:
      "En cas de blessure ('Légère', 'Grave' ou 'Critique') Le résultat du jet de blessure est augmenté d'un cran.",
    type: TYPE_CHECKBOX,
  },
  immuJambes: {
    label: 'Immunité/jambes',
    description:
      "Si le plus petit des deux dé est un 1, le résultat est automatiquement 'Aucun effet' (prévaut sur arme sacrée).",
    type: TYPE_CHECKBOX,
  },
  immuTete: {
    label: 'Immunité/tête',
    description:
      "Si le plus petit des deux dé est un 5 ou un 6, le résultat est automatiquement 'Aucun effet' (prévaut sur Arme sacrée et double 6).",
    type: TYPE_CHECKBOX,
  },
  immuSonne: {
    label: 'Immunité/sonné',
    description:
      "Si le résultat du jet de blessure indique 'Sonné', il est transformé en 'Aucun effet'.",
    type: TYPE_CHECKBOX,
    disabled: [['ethere', (fieldValue) => !!fieldValue]],
  },
};
