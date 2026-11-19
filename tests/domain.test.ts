import {test} from 'node:test';import assert from 'node:assert/strict';import {scenario,temporary} from './support/scenario.ts';import {validate} from '../src/domain/model.ts';import {digest} from '../src/domain/shared.ts';import * as E from '../src/domain/engine.ts';

test('完整专业示例和新建固定依据有效',()=>{const p=scenario();validate(p);E.validateTransition(p);});
test('未知字段和重复意见ID拒绝',()=>{const p=scenario();p.extra=true;assert.throws(()=>validate(p));delete p.extra;p.notes.push(p.notes[0]);assert.throws(()=>validate(p));});
test('新意见错误摘要拒绝',()=>{const p=scenario();p.notes[0].target_sha256='0'.repeat(64);assert.throws(()=>E.validateTransition(p));});
test('处理意见必须保留说明',()=>{const p=scenario();p.notes[0].status='resolved';assert.throws(()=>validate(p));p.notes[0].resolution='已对照固定材料处理，待作者阅读。';validate(p);});

test('20米除10秒等于2米每秒与36/5千米每小时',()=>{const p=scenario();assert.equal(E.evaluate(p,{kind:'calculation',id:'speed'}).exact,'2');assert.equal(E.evaluate(p,{kind:'calculation',id:'speed'},'km/h').exact,'36/5');});
test('十进制0.1加0.2精确为3/10',()=>{const p=scenario();p.quantities=p.quantities.map((q:any,n:number)=>({...q,value:n?'0.2':'0.1',unit:'1'}));p.calculations[0].operator='add';assert.equal(E.evaluate(p,{kind:'calculation',id:'speed'}).exact,'3/10');});
test('厘米与米先转SI再相加',()=>{const p=scenario();p.quantities[0].value='20';p.quantities[0].unit='cm';p.quantities[1].unit='m';p.quantities[1].value='1';p.calculations[0].operator='add';assert.equal(E.evaluate(p,{kind:'calculation',id:'speed'},'cm').exact,'120');});
test('不同量纲相加与错误输出单位拒绝',()=>{const p=scenario();p.calculations[0].operator='add';assert.throws(()=>validate(p));assert.throws(()=>E.evaluate(scenario(),{kind:'calculation',id:'speed'},'kg'));});
test('除零拒绝',()=>{const p=scenario();p.quantities[1].value='0';assert.throws(()=>validate(p));});
test('循环依赖与悬空操作数拒绝',()=>{const p=scenario();p.calculations[0].left={kind:'calculation',id:'speed'};assert.throws(()=>validate(p));p.calculations[0].left.id='missing';assert.throws(()=>validate(p));});
test('未知单位、表达式及过量十进制拒绝',()=>{for(const value of ['1e9','1+2','0.1234567890123456789']){const p=scenario();p.quantities[0].value=value;assert.throws(()=>validate(p));}const q=scenario();q.quantities[0].unit='C';assert.throws(()=>validate(q));});
test('负小数与零分数符号正确',()=>{const v=E.decimal('-0.5');assert.equal(v.n,-1n);assert.equal(v.d,2n);assert.equal(E.decimal('-0.0').n,0n);});
test('体积升精确换成立方米',()=>{const p=scenario();p.quantities[0].unit='L';p.quantities[0].value='2';assert.equal(E.evaluate(p,{kind:'quantity',id:'distance'},'m3').exact,'1/500');});
test('多步计算可复用，不误判成环',()=>{const p=scenario();p.calculations.push({id:'twice',title:'两倍',operator:'add',left:{kind:'calculation',id:'speed'},right:{kind:'calculation',id:'speed'},reason:'同节点复用'});assert.equal(E.evaluate(p,{kind:'calculation',id:'twice'}).exact,'4');});
test('修改上游计算理由也触发主张与文章复核',()=>{const a=scenario(),p=structuredClone(a);p.calculations[0].reason+='明确平均速率';E.validateTransition(p,a);assert.deepEqual(E.check(p).stale_claim_ids,['claim']);assert.equal(E.check(p).stale_block_ids.length,2);});
test('修改数量让意见过期，新主张错摘要拒绝',()=>{const old=scenario(),p=structuredClone(old);p.quantities[0].value='25';E.validateTransition(p,old);assert.deepEqual(E.check(p).stale_note_ids,['note']);p.claims[0].basis_sha256='0'.repeat(64);assert.throws(()=>E.validateTransition(p,old));});
test('类比局限不能省略，修改后文章需复核',()=>{const p=scenario();p.analogies[0].limits='';assert.throws(()=>validate(p));const q=scenario();q.analogies[0].limits+='也不推论方向';assert.equal(E.check(q).stale_block_ids.length,2);});
test('新段落改稿必须明确固定当前依据',()=>{const old=scenario(),p=structuredClone(old);p.quantities[0].value='25';p.blocks[0].text+='换了表述';assert.throws(()=>E.validateTransition(p,old));p.blocks[0].basis_sha256=E.blockBasis(p,p.blocks[0].claim_ids);E.validateTransition(p,old);});
test('精确有理数预算拒绝无界膨胀',()=>{const p=scenario();p.quantities[0].value='999999999999999999';let prior={kind:'quantity',id:'distance'};for(let n=0;n<7;n++){const c={id:'pow'+n,title:'测试',operator:'multiply',left:prior,right:prior,reason:'预算反例'};p.calculations.push(c);prior={kind:'calculation',id:c.id};}assert.throws(()=>E.evaluate(p,prior));});
