import {randomUUID} from "crypto"

class DataBaseMemory {
    #videos = new Map()

    list(search){
        //aqui estou retornando todos os vídeos menos os ids (keys)
        return Array.from(this.#videos.entries())
        .map((videoArray) => {
            const id = videoArray[0]
            const data = videoArray[1]
            return{
                id,
                ...data,
            }
        })
        .filter((video) => {
            if(search){
                return video.title.includes(search)
            } return true
        })
    }

    create(video){
        //cria-se um id único para o vídeo
        const videoId = randomUUID()
        //a estrutura map recebe dois valores key (id) e value
        this.#videos.set(videoId,video)
    }

    update(id,video){
        this.#videos.set(id,video)
    }

    delete(id){
        this.#videos.delete(id)
    }
}


export {DataBaseMemory}