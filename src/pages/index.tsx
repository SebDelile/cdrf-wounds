import { inputsType } from '@/types/inputsType';
import { outputsType } from '@/types/outputsType';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { computeResults } from '@/utils/computeResults';
import { woundResults } from 'src/constants/woundResults';
import { woundTable } from '@/constants/woundTable';
import { initialResults } from '@/constants/initialResults';

export default function Home() {
  const [isDebug, setIsDebug] = useState(false);
  const [inputs, setInputs] = useState<inputsType>({
    FOR: 0,
    armeSacree: false,
    tirImmobile: false,
    fleau: false,
    //
    RES: 0,
    armureSacree: false,
    durACuire: false,
  });

  const [outputs, setOutputs] = useState<outputsType>(initialResults);

  useEffect(() => {
    setOutputs(computeResults(inputs, isDebug));
  }, [inputs, isDebug]);

  const handleToggleBoolean = (field: keyof inputsType) => {
    setInputs((state) => ({
      ...state,
      [field]: !state[field],
    }));
  };

  const totalOutputs = Object.values(outputs).reduce((a, b) => a + b, 0);
  return (
    <>
      <Head>
        <title>Create Next App</title>
      </Head>
      <main>
        <div>
          <label>
            {'FOR : '}
            <input
              type="number"
              value={inputs.FOR}
              onChange={(event) => {
                setInputs((state) => ({
                  ...state,
                  FOR: parseInt(event.target.value),
                }));
              }}
            />
          </label>
          <label>
            <input
              type="checkbox"
              checked={inputs.armeSacree}
              onChange={() => {
                handleToggleBoolean('armeSacree');
              }}
            />
            {'Arme sacrée'}
          </label>
          <label>
            <input
              type="checkbox"
              checked={inputs.tirImmobile}
              onChange={() => {
                handleToggleBoolean('tirImmobile');
              }}
            />
            {'Tir immobile'}
          </label>
          <label>
            <input
              type="checkbox"
              checked={inputs.fleau}
              onChange={() => {
                handleToggleBoolean('fleau');
              }}
            />
            {'Fleau'}
          </label>
        </div>
        <div>
          <label>
            {'RES : '}
            <input
              type="number"
              value={inputs.RES}
              onChange={(event) => {
                setInputs((state) => ({
                  ...state,
                  RES: parseInt(event.target.value),
                }));
              }}
            />
          </label>
          <label>
            <input
              type="checkbox"
              checked={inputs.armureSacree}
              onChange={() => {
                handleToggleBoolean('armureSacree');
              }}
            />
            {'Armure sacrée'}
          </label>
          <label>
            <input
              type="checkbox"
              checked={inputs.durACuire}
              onChange={() => {
                handleToggleBoolean('durACuire');
              }}
            />
            {'Dur à cuire'}
          </label>
        </div>
        <table>
          <thead>
            <tr>
              <th>{`(${totalOutputs})`}</th>
              <th>Somme</th>
              <th>Proportion</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(outputs).map(([resultat, somme]) => (
              <tr key={resultat}>
                <th>{resultat}</th>
                <td>{somme}</td>
                <td>
                  {totalOutputs ? Math.round((somme / totalOutputs) * 100) : 0}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
      <footer>
        <label>
          <input
            type="checkbox"
            checked={isDebug}
            onChange={() => {
              setIsDebug((state) => !state);
            }}
          />
          {'Debug'}
        </label>
      </footer>
    </>
  );
}
