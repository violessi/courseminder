import { type Edge, type Node, Position } from '@xyflow/svelte';

export const initialNodes: Node[]= [
    {
        id: 'Physics 71',
        type: 'custom',
        // data: {name: 'Physics 71', height: 20, width: 50},
        data: {name: 'Physics 71', height: 40, width: 100},
        position: {x:301, y:185},
        draggable: false,
        // sourcePosition: Position.Bottom
    },
    {
        id: 'Physics 72',
        type: 'custom',
        data: {name: 'Physics 72', height: 40, width: 100},
        position: {x:301, y:280},
        draggable: false,
        // targetPosition: Position.Top     
    },
    {
        id: 'Math 21',
        type: 'custom',
        data: {name: 'Math 21', height: 40, width: 100},
        position: {x:577, y:139},
        draggable: false,        
    },
    {
        id: 'Math 22',
        type: 'custom',
        data: {name: 'Math 22', height: 40, width: 100},
        position: {x:542, y:221},
        draggable: false,        
    },
    {
        id: 'Math 23',
        type: 'custom',
        data: {name: 'Math 23', height: 40, width: 100},
        position: {x:526, y:318},
        draggable: false,        
    },
    {
        id: 'Math 40',
        type: 'custom',
        data: {name: 'Math 40', height: 40, width: 100},
        position: {x:443, y:397},
        draggable: false,        
    },
    {
        id: 'CS 136',
        type: 'custom',
        data: {name: 'CS 136', height: 40, width: 100},
        position: {x:589, y:400},
        draggable: false,        
    },
    {
        id: 'CS 138',
        type: 'custom',
        data: {name: 'CS 138', height: 40, width: 100},
        position: {x:555, y:491},
        draggable: false,        
    },
    {
        id: 'CS 132',
        type: 'custom',
        data: {name: 'CS 132', height: 40, width: 100},
        position: {x:479, y:665},
        draggable: false,        
    },
    {
        id: 'Eng 30',
        type: 'custom',
        data: {name: 'Eng 30', height: 40, width: 100},
        position: {x:299, y:462},
        draggable: false,        
    },
    {
        id: 'Speech 30',
        type: 'custom',
        data: {name: 'Speech 30', height: 40, width: 100},
        position: {x:247, y:541},
        draggable: false,        
    },
    {
        id: 'CS 194',
        type: 'custom',
        data: {name: 'CS 194', height: 40, width: 100},
        position: {x:397, y:564},
        draggable: false,        
    },
    {
        id: 'CS 198',
        type: 'custom',
        data: {name: 'CS 198', height: 40, width: 100},
        position: {x:334, y:655},
        draggable: false,        
    },
    {
        id: 'CS 199',
        type: 'custom',
        data: {name: 'CS 199', height: 40, width: 100},
        position: {x:313, y:749},
        draggable: false,        
    },
    {
        id: 'Kas 1',
        type: 'custom',
        data: {name: 'Kas 1', height: 40, width: 100},
        position: {x:269, y:829},
        draggable: false,        
    },
    {
        id: 'Philo 1',
        type: 'custom',
        data: {name: 'Philo 1', height: 40, width: 100},
        position: {x:398, y:829},
        draggable: false,        
    },
    {
        id: 'Soc Sci 1/2',
        type: 'custom',
        data: {name: 'Soc Sci 1/2', height: 40, width: 100},
        position: {x:523, y:829},
        draggable: false,        
    },
    {
        id: 'Eng 13',
        type: 'custom',
        data: {name: 'Eng 13', height: 40, width: 100},
        position: {x:676, y:829},
        draggable: false,        
    },
    {
        id: 'Fil 40',
        type: 'custom',
        data: {name: 'Fil 40', height: 40, width: 100},
        position: {x:786, y:829},
        draggable: false,        
    },
    {
        id: 'Engg 150',
        type: 'custom',
        data: {name: 'Engg 150', height: 40, width: 100},
        position: {x:895, y:829},
        draggable: false,        
    },
    {
        id: 'STS 1/DRMAPS',
        type: 'custom',
        data: {name: 'STS 1/DRMAPS', height: 40, width: 100},
        position: {x:282, y:884},
        draggable: false,        
    },
    {
        id: 'GE Elective',
        type: 'custom',
        data: {name: 'GE Elective', height: 40, width: 100},
        position: {x:448, y:884},
        draggable: false,        
    },
    {
        id: 'Arts 1',
        type: 'custom',
        data: {name: 'Arts 1', height: 40, width: 100},
        position: {x:610, y:884},
        draggable: false,        
    },
    {
        id: 'PI 100',
        type: 'custom',
        data: {name: 'PI 100', height: 40, width: 100},
        position: {x:728, y:884},
        draggable: false,        
    },
    {
        id: 'Free Elective',
        type: 'custom',
        data: {name: 'Free Elective', height: 40, width: 100},
        position: {x:828, y:884},
        draggable: false,        
    },
    {
        id: 'NSTP 1',
        type: 'custom',
        data: {name: 'NSTP 1', height: 40, width: 100},
        position: {x:449, y:934},
        draggable: false,        
    },
    {
        id: 'NSTP 2',
        type: 'custom',
        data: {name: 'NSTP 2', height: 40, width: 100},
        position: {x:551, y:934},
        draggable: false,        
    },
    {
        id: 'CS 30',
        type: 'custom',
        data: {name: 'CS 30', height: 40, width: 100},
        position: {x:845, y:140},
        draggable: false,        
    },
    {
        id: 'CS 31',
        type: 'custom',
        data: {name: 'CS 31', height: 40, width: 100},
        position: {x:745, y:216},
        draggable: false,        
    },
    {
        id: 'CS 32',
        type: 'custom',
        data: {name: 'CS 32', height: 40, width: 100},
        position: {x:799, y:299},
        draggable: false,        
    },
    {
        id: 'CS 33',
        type: 'custom',
        data: {name: 'CS 33', height: 40, width: 100},
        position: {x:799, y:376},
        draggable: false,        
    },
    {
        id: 'CS 191',
        type: 'custom',
        data: {name: 'CS 191', height: 40, width: 100},
        position: {x:734, y:455},
        draggable: false,        
    },
    {
        id: 'CS 192',
        type: 'custom',
        data: {name: 'CS 192', height: 40, width: 100},
        position: {x:706, y:567},
        draggable: false,        
    },
    {
        id: 'CS 195',
        type: 'custom',
        data: {name: 'CS 195', height: 40, width: 100},
        position: {x:634, y:649},
        draggable: false,        
    },
    {
        id: 'CS 196',
        type: 'custom',
        data: {name: 'CS 196', height: 40, width: 100},
        position: {x:724, y:724},
        draggable: false,        
    },
    {
        id: 'CS 150',
        type: 'custom',
        data: {name: 'CS 150', height: 40, width: 100},
        position: {x:849, y:498},
        draggable: false,        
    },
    {
        id: 'CS 165',
        type: 'custom',
        data: {name: 'CS 165', height: 40, width: 100},
        position: {x:974, y:426},
        draggable: false,        
    },
    {
        id: 'CS 180',
        type: 'custom',
        data: {name: 'CS 180', height: 40, width: 100},
        position: {x:974, y:498},
        draggable: false,        
    },
    {
        id: 'CS 133',
        type: 'custom',
        data: {name: 'CS 196', height: 40, width: 100},
        position: {x:960, y:614},
        draggable: false,        
    },
    {
        id: 'CS 155',
        type: 'custom',
        data: {name: 'CS 196', height: 40, width: 100},
        position: {x:911, y:699},
        draggable: false,        
    },
    {
        id: 'CS 11',
        type: 'custom',
        data: {name: 'CS 11', height: 40, width: 100},
        position: {x:1118, y:139},
        draggable: false,        
    },
    {
        id: 'CS 10',
        type: 'custom',
        data: {name: 'CS 10', height: 40, width: 100},
        position: {x:1286, y:134},
        draggable: false,        
    },
    {
        id: 'CS 12',
        type: 'custom',
        data: {name: 'CS 12', height: 40, width: 100},
        position: {x:1169, y:207},
        draggable: false,        
    },
    {
        id: 'CS 20',
        type: 'custom',
        data: {name: 'CS 20', height: 40, width: 100},
        position: {x:1135, y:302},
        draggable: false,        
    },
    {
        id: 'CS 21',
        type: 'custom',
        data: {name: 'CS 21', height: 40, width: 100},
        position: {x:1189, y:371},
        draggable: false,        
    },
    {
        id: 'CS 140',
        type: 'custom',
        data: {name: 'CS 140', height: 40, width: 100},
        position: {x:1257, y:448},
        draggable: false,        
    },
    {
        id: 'CS 145',
        type: 'custom',
        data: {name: 'CS 145', height: 40, width: 100},
        position: {x:1163, y:540},
        draggable: false,        
    },
    {
        id: 'CS 153',
        type: 'custom',
        data: {name: 'CS 153', height: 40, width: 100},
        position: {x:1283, y:540},
        draggable: false,        
    },
    {
        id: 'CS Elective',
        type: 'custom',
        data: {name: 'CS Elective', height: 40, width: 100},
        position: {x:1170, y:624},
        draggable: false,        
    },

    // {
    //     id: 'PE 1',
    //     type: 'custom',
    //     data: {name: 'PE 1', height: 20, width: 50},
    //     position: {x:449, y:934},
    //     draggable: false,        
    // },
    // {
    //     id: 'PE 2',
    //     type: 'custom',
    //     data: {name: 'PE 2', height: 20, width: 50},
    //     position: {x:551, y:934},
    //     draggable: false,        
    // },
    // {
    //     id: 'PE 3',
    //     type: 'custom',
    //     data: {name: 'PE 3', height: 20, width: 50},
    //     position: {x:650, y:934},
    //     draggable: false,        
    // },
    // {
    //     id: 'PE 4',
    //     type: 'custom',
    //     data: {name: 'PE 4', height: 20, width: 50},
    //     position: {x:746, y:934},
    //     draggable: false,        
    // },
    


]
export const initialEdges: Edge[]=[
    {
        id: 'eP71-P72',
        type: 'default',
        source:'Physics 71',
        target: 'Physics 72',
        animated: true,
        style: 'stroke: #000000;'
    },
    {
        id: 'eM21-M22',
        type: 'default',
        source:'Math 21',
        target: 'Math 22',
        animated: true,
        style: 'stroke: #000000;'
    },
    {
        id: 'eM22-M23',
        type: 'default',
        source:'Math 22',
        target: 'Math 23',
        animated: true,
        style: 'stroke: #000000;'
    },
    {
        id: 'eM23-M40',
        type: 'default',
        source:'Math 23',
        target: 'Math 40',
        animated: true,
        style: 'stroke: #000000;'
    },
    {
        id: 'eM22-M40',
        type: 'default',
        source:'Math 22',
        target: 'Math 40',
        animated: true,
        style: 'stroke: #000000;'
    },
    {
        id: 'eM23-C136',
        type: 'default',
        source:'Math 23',
        target: 'CS 136',
        animated: true,
        style: 'stroke: #000000;'
    },
    {
        id: 'eM40-C138',
        type: 'default',
        source:'Math 40',
        target: 'CS 138',
        animated: true,
        style: 'stroke: #000000;'
    },
    {
        id: 'eC136-C138',
        type: 'default',
        source:'CS 136',
        target: 'CS 138',
        animated: true,
        style: 'stroke: #000000;'
    },
    {
        id: 'eM23-C132',
        type: 'default',
        source:'Math 23',
        target: 'CS 132',
        animated: true,
        style: 'stroke: #000000;'
    },
    {
        id: 'eM40-C132',
        type: 'default',
        source:'Math 40',
        target: 'CS 132',
        animated: true,
        style: 'stroke: #000000;'
    },
    {
        id: 'eE30-C198',
        type: 'default',
        source:'Eng 30',
        target: 'CS 198',
        animated: true,
        style: 'stroke: #000000;'
    },
    {
        id: 'eS30-C198',
        type: 'default',
        source:'Speech 30',
        target: 'CS 198',
        animated: true,
        style: 'stroke: #000000;'
    },
    {
        id: 'eC194-C198',
        type: 'default',
        source:'CS 194',
        target: 'CS 198',
        animated: true,
        style: 'stroke: #000000;'
    },
    {
        id: 'eC198-C199',
        type: 'default',
        source:'CS 198',
        target: 'CS 199',
        animated: true,
        style: 'stroke: #000000;'
    },
    {
        id: 'eC30-C31',
        type: 'default',
        source:'CS 30',
        target: 'CS 31',
        animated: true,
        style: 'stroke: #000000;'
    },
    {
        id: 'eC31-C32',
        type: 'default',
        source:'CS 31',
        target: 'CS 32',
        animated: true,
        style: 'stroke: #000000;'
    },
    {
        id: 'eC31-C132',
        type: 'default',
        source:'CS 31',
        target: 'CS 132',
        animated: true,
        style: 'stroke: #000000;'
    },
    {
        id: 'eC32-C33',
        type: 'default',
        source:'CS 31',
        target: 'CS 33',
        animated: true,
        style: 'stroke: #000000;'
    },
    {
        id: 'eC33-C191',
        type: 'default',
        source:'CS 33',
        target: 'CS 191',
        animated: true,
        style: 'stroke: #000000;'
    },
    {
        id: 'eC191-C192',
        type: 'default',
        source:'CS 191',
        target: 'CS 192',
        animated: true,
        style: 'stroke: #000000;'
    },
    {
        id: 'eC192-C195',
        type: 'default',
        source:'CS 192',
        target: 'CS 195',
        animated: true,
        style: 'stroke: #000000;'
    },
    {
        id: 'eC30-C133',
        type: 'default',
        source:'CS 30',
        target: 'CS 133',
        animated: true,
        style: 'stroke: #000000;'
    },
    {
        id: 'eC33-C150',
        type: 'default',
        source:'CS 33',
        target: 'CS 150',
        animated: true,
        style: 'stroke: #000000;'
    },
    {
        id: 'eC33-C165',
        type: 'default',
        source:'CS 33',
        target: 'CS 165',
        animated: true,
        style: 'stroke: #000000;'
    },
    {
        id: 'eC33-C180',
        type: 'default',
        source:'CS 33',
        target: 'CS 180',
        animated: true,
        style: 'stroke: #000000;'
    },
    {
        id: 'eC150-C155',
        type: 'default',
        source:'CS 150',
        target: 'CS 155',
        animated: true,
        style: 'stroke: #000000;'
    },
    {
        id: 'eC133-C155',
        type: 'default',
        source:'CS 133',
        target: 'CS 155',
        animated: true,
        style: 'stroke: #000000;'
    },
    {
        id: 'eC11-C12',
        type: 'default',
        source:'CS 11',
        target: 'CS 12',
        animated: true,
        style: 'stroke: #000000;'
    },
    {
        id: 'eC12-C20',
        type: 'default',
        source:'CS 12',
        target: 'CS 20',
        animated: true,
        style: 'stroke: #000000;'
    },
    {
        id: 'eC12-C32',
        type: 'default',
        source:'CS 12',
        target: 'CS 32',
        animated: true,
        style: 'stroke: #000000;'
    },
    {
        id: 'eC20-C21',
        type: 'default',
        source:'CS 20',
        target: 'CS 21',
        animated: true,
        style: 'stroke: #000000;'
    },
    {
        id: 'eC21-C140',
        type: 'default',
        source:'CS 21',
        target: 'CS 140',
        animated: true,
        style: 'stroke: #000000;'
    },
    {
        id: 'eC21-C155',
        type: 'default',
        source:'CS 21',
        target: 'CS 155',
        animated: true,
        style: 'stroke: #000000;'
    },
    {
        id: 'eC140-C145',
        type: 'default',
        source:'CS 140',
        target: 'CS 145',
        animated: true,
        style: 'stroke: #000000;'
    },
    {
        id: 'eC140-C153',
        type: 'default',
        source:'CS 140',
        target: 'CS 153',
        animated: true,
        style: 'stroke: #000000;'
    },

];

for (const node of initialNodes) {
    node.data.isSource = initialEdges.some(edge => edge.source === node.id);
    node.data.isTarget = initialEdges.some(edge => edge.target === node.id);
  }