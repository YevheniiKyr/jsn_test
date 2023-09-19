import {$host} from "./index";

export const createHero = async (hero) => {
    console.log('create hero client')
    const {data} = await $host.post('superhero/',
        hero
    )
    return data;
}

export const getHeroes = async (limit, page) => {
    const {data} = await $host.get('superhero/', {
        params: {
            limit: limit,
            page: page
        }
    })
    return data;
}

export const getHeroById = async (id) => {
    const {data} = await $host.get(`superhero/${id}`)
    return data;
}
