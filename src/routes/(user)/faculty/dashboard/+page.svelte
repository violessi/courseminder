<script lang="ts">
    import Card from '$lib/components/Card.svelte';
    import graph from '$lib/assets/samplegraph.png';

    import { initFirebase, db } from '$lib/firebase/client';
    import { ref, get, onValue, set } from 'firebase/database';
    import { facultyDegree, facultyName } from '$lib/stores/CurriculumStores';

    initFirebase();
    
    let degree : string = '';
    facultyDegree.subscribe((value : string) => {
        degree = value.split(' ').slice(2, 4).join(' ');
    });

    let nextSemester = '';
    const nextSemesterRef = ref(db, `courseDemand/${nextSemester}`);
    let courseDemand : Record<string, number> = {};

    onValue(nextSemesterRef, (snapshot: any) => {
        if (snapshot.exists()) {
            nextSemester = snapshot.val()['nextSemester'];
        } else {
            console.log('nextSemesterRef does not exist');
        }

        // Create courseDemandRef and fetch courseDemand here
        let courseDemandRef = ref(db, `courseDemand/${degree}/${nextSemester}`);
        get(courseDemandRef).then((snapshot: any) => {
            if (snapshot.exists()) {
                courseDemand = snapshot.val();
            } else {
                console.log('courseDemandRef does not exist');
                courseDemand = {};  // or set a default value
            }    
        });
    });

    // if there are changes in demand, push data to database
    function pushCourseDemandData(nextSemester : string){
        let courseDemandRef = ref(db, `courseDemand/${degree}/${nextSemester}`);
        set(courseDemandRef, courseDemand);
    }

    const courseStatusRef = ref(db, `courseStatus/${degree}`);
    onValue(courseStatusRef, (snapshot: any) => {
        courseDemand = {};
        const data = snapshot.val();
        for (let studentnumber in data){
            for (let course in data[studentnumber]){
                if (data[studentnumber][course] == 'To Take'){
                    courseDemand[course] = courseDemand[course] ? courseDemand[course] + 1 : 1;
                }
            }
        }
        if (nextSemester != ''){
            pushCourseDemandData(nextSemester);
        }
    });

    $: console.log(courseDemand);

</script>

<div class="h-full flex flex-col p-10 gap-10">
    <div>
        <div class="title-default-faculty">Welcome, Dr. Masayuki!</div>
        <div class="subtitle-default-faculty pt-2">Department of Computer Science</div>
    </div>
    <!-- Cards (see Skeleton for more information) -->
    <section class="grid grid-cols-1 grid-rows-4 gap-5 h-full">
        <!-- Card for Your Classes -->
        <Card background="bg-primary-300" height="row-span-4" flex="flex flex-col" items="items-center" padding="p-4">
            <div class="font-bold text-error-900 text-xl uppercase">Demand</div>
            <!-- insert graph function here-->
            <img src={graph} alt="yeah" />
        </Card>
    </section>
</div>
