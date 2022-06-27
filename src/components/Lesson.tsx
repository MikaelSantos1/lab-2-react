
import { CheckCircle, Lock } from 'phosphor-react'
import {isPast, format} from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { Link, useParams } from 'react-router-dom';
interface LessonProps {
    title: string;
    slug: string;
    availableAt: Date;
    type: 'live' | 'class'

}
import classNames from 'classnames'

export function Lesson({ title, slug, availableAt, type }: LessonProps) {
    const {slug:slugUrl}=useParams<{slug:string}>()
  
    const isLessonAvailable = isPast(availableAt);
    const availableDateFormart = format(availableAt,"EEEE ' • ' d 'de' MMMM ' •  'k'h'mm ",{
        locale:ptBR
    })
    const isActiveLesson = slugUrl===slug
    return (
        <Link to={`/event/lesson/${slug}`} className='group'>
            <span className="text-gray-300">{availableDateFormart}</span>

            <div className={classNames('rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500',{
            'bg-green-500':isActiveLesson 
            })}>
                <header className="flex items-center justify-between">
                    {
                        isLessonAvailable ? (
                            <span className={classNames("flex items-center gap-2 text-sm  font-medium",{
                                'text-white':isActiveLesson,
                                'text-blue-500':!isActiveLesson
                            })}>
                                <CheckCircle size={20} />
                                Conteudo liberado
                            </span>
                        ):(
                            <span className="flex items-center gap-2 text-sm text-orange-500 font-medium">
                            <Lock size={20}/>
                            Em breve
                        </span>
                        )
                   }
                    <span className="text-xs grounded py-[0.125rem] px-2 text-white border border-green-300 font-bold">
                        {type === 'live' ? 'Ao vivo' : 'Aula pratica'}
                    </span>
                </header>

                <strong className={classNames(" mt-5 block",{
                    'text-white':isActiveLesson,
                    'text-gray-200':!isActiveLesson
                })}>{title}</strong>
            </div>
        </Link>
    )
}