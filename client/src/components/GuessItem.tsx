import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { Player } from './Player';
import PlayerIcon from './PlayerIcon';

const GuessItem = ({answer, players, addGuess, index, currentGuessId, isPicking}: {answer:string, players:Player[], addGuess: any, index:number, currentGuessId: string, isPicking: boolean}) => {

    const playerChoices = players.map((player:Player) => {
        return (
        <Menu.Item key={player.id + "-" + answer}>
              {({ active }) => (
                <div className={`flex justify-between px-2' + ${active && 'bg-purple'}`} onClick={() => addGuess(index, player.id)}>
                    <div className='flex justify-start self-center'>{player.name}</div>
                    <div className='flex justify-end h-10 self-center'><PlayerIcon iconName={player.icon} /></div>
                </div>
              )}
        </Menu.Item>
    )});

    const hasGuessed = currentGuessId !== "none";
    const guessedIcon = players.find((player:Player) => player.id === currentGuessId)?.icon || "none";

    return (
      <Menu as="div" className="relative">
        <Menu.Button className="border-b-2 w-full text-left p-2 flex-1 disabled:opacity-50 break-word overflow-x-auto" disabled={!isPicking} >
          {answer}
          {
            hasGuessed &&
            <div className='absolute right-0 -bottom-5 h-20'>
              <PlayerIcon iconName={guessedIcon} customClass="h-10"/>
            </div>
          }
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >

        <Menu.Items className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1 text-black px-1">
            <Menu.Item>
              {({ active }) => (
                <div className={`flex justify-between px-2' + ${active && 'bg-purple'}`} onClick={() => addGuess(index, "none")}>
                    <div className='flex justify-start self-center'>No Guess</div>
                    <div className='flex justify-end h-10 self-center'></div>
                </div>
              )}
            </Menu.Item>
            {playerChoices}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
    )
    
}

export default GuessItem;