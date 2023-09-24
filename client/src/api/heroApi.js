import {$host} from "./index";

export const createHero = async (hero) => {
    const {data} = await $host.post('superhero/',
        hero
    )
    return data;
}

export const updateHero = async (id, hero) => {
    const {data} = await $host.put(`superhero/${id}`,
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
