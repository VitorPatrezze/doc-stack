code# Centralizar Cadastro médico
O médico poderia se cadastrar 1 vez no site, e dali em diante para hospitais e outras instituições seria mais facil de realizar o cadastro médico utilizando o DocStack, visto que todas as informações do médico estariam centralizadas no perfil dele dentro do DocStack

# Portfolio

### Preenchimento da cirurgia
Acabou a cirurgia, cada medico vai pra um lado.
Para preencher o formulário, o médico entra no site e vai para a pagina de preencher form: 
1. Colocar Iniciais, Data e Hospital/clínica da cirurgia
a. Caso a cirurgia não exista na DB, vai ter um alerta de "criar registro?". Aceitando, a cirurgia será criada.
b. Caso exista, a informação do formulário sera adicionada à cirurgia já existente.
2. Preencher o fomulário com informações de acordo com a especialidade do médico.
Todas os médicos que preencherem informações sobre a cirurgia terão ela registrada na DB com status "não confirmado"

Somente após o paciente preencher o formulário que as operações terão status "confirmado" e serão mostradas no portfolio do médico.

O paciente receberá o formulário via whatsapp a partir do número de telefone dele. 

O formulário do paciente terá as seguintes perguntas (formato de notas):
1. Satisfação pré-operatória
2. Satisfação pós-operatória
3. Cordialidade dos médicos

## Atendimento Clínico
Acabou o atendimento, médico vai finalizar consulta.
Para preencher o formulário, o médico entra no site e vai para a pagina de preencher form: 
1. Colocar Iniciais, Data e Hospital/clínica do atendimento
    SEMPRE será criado um novo registro em casos de consulta, já que uma pessoa pode ter mais de uma consulta por clínica/hospital em um dia.
2. Preencher o fomulário com informações de acordo com a especialidade do médico.

O paciente receberá o formulário via whatsapp a partir do número de telefone dele. 

O formulário do paciente terá as seguintes perguntas (formato de notas):
1. Satisfação geral da consulta
2. Satisfação com o consultório
3. Cordialidade do médico
4. "Todas as suas perguntas foram respondidas de acordo?"