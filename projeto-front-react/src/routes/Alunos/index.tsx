import { useEffect, useState } from "react";
import type { TipoAluno } from "../../types/tipoAluno";
import { Link } from "react-router-dom";

export default function Alunos() {

  const [alunos, setAlunos] = useState<TipoAluno[]>([]);

  useEffect(() => {

    const callList = async ()=>{
      try {
        const response = await fetch("https://projetoaluno-69jw.onrender.com/aluno");
        
        if(response.ok){
          const data:TipoAluno[] = await response.json();
          setAlunos(data);
        }else{
          throw new Error("Listagem incompleta!");
        }

      } catch (error) {
        console.error(error);
      }
    }

    callList();
    
  }, []);
  
  return (
    <main>
        <h1>Lista de Alunos</h1>
        <table className="tableAluno">
          
          <thead>
            <tr>
              <th>RM</th>
              <th>ALUNO</th>
              <th>TURMA</th>
              <th>NOTA</th>
              <th>EDITAR/EXCLUIR</th>
            </tr>
          </thead>

          <tbody>
            {alunos.map((a)=>(
              <tr key={a.rm}>
                <td>{a.rm}</td>
                <td>{a.nome}</td>
                <td>{a.turma}</td>
                <td>{a.nota}</td>
                <td> <Link to={`/editar/aluno/${a.rm}`}>Editar</Link> / <Link to={`/editar/aluno/${a.rm}`}>Excluir</Link></td>
              </tr>
            ))}
          </tbody>
          
          <tfoot>
            <tr>
              <td colSpan={5}>Quantidade de Alunos : {alunos.length}</td>
            </tr>
          </tfoot>

        </table>
    </main>
  )
}
