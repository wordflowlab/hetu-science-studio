import {artifact} from './artifact.ts';
import {find} from './shared.ts';
import {requireValue as need} from '../../vendor/project-store.ts';
import * as engine from './engine.ts';
export {validateDomain,validateTransition} from './engine.ts';
export async function checkSources(_p:any,_s:any[],_r:any){}
export async function pureAction(_a:string,_i:any){return undefined;}
export async function writeProfessional(a:string,p:any,_s:any[],i:any,..._rest:any[]){throw Error('未知专业写动作。');}
export function summaries(p:any){return [{title:'完整阅读本',lines:[engine.reading(p)]},{title:'专业复核',lines:[JSON.stringify(engine.check(p),null,2)]},...Object.entries(p).filter(([k,v])=>Array.isArray(v)).map(([k,v])=>({title:k,lines:[JSON.stringify(v,null,2)]}))];}
export async function readProfessional(a:string,p:any,_s:any[],i:any,_r:any){
 if(a==='target_digest')return {target_sha256:engine.targetDigest(p,i.target_kind,i.target_id)};
 if(a==='check_science')return engine.check(p);

 if(a==='claim_basis')return {basis_sha256:engine.claimBasis(p,i)};
 if(a==='block_basis')return {basis_sha256:engine.blockBasis(p,i.claim_ids)};
 if(a==='evaluate')return engine.evaluate(p,i.operand,i.unit);

 if(a==='export_reading')return artifact(engine.reading(p),'科普写作阅读本.txt','text/plain',i);
 if(a==='export_review'){const {reportHTML}=await import('./report.ts');return artifact(reportHTML({project:p}),'科普写作审核本.html','text/html',i);}
}
