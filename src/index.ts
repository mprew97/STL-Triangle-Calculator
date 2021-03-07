import fs from "fs";
import path from "path";
import { Triangle, Vector3} from 'three';

type Vertex = {
    x: number;
    y: number;
    z: number;
}

const isFacet = (line: Array<string>): boolean => {
    if (line.includes("facet")) {
        return true;
    }
}

const hasVertex = (line: Array<string>): boolean => {
    if (line.includes("vertex")) {
        return true;
    }
}

const isTriangle = (vertices: Array<Vertex>): boolean => {
    if (vertices.length === 3) {
        return true;
    }
}

const calculate3dArea = (v1: Vertex, v2: Vertex, v3: Vertex): number => {
    const vector1 = new Vector3(v1.x, v1.y, v1.z);
    const vector2 = new Vector3(v2.x, v2.y, v2.z);
    const vector3 = new Vector3(v3.x, v3.y, v3.z);
    const triangle = new Triangle(vector1, vector2, vector3);
    const area = triangle.getArea();

    return area;

}

const processLineByLine = (filePath) => {
    const fileStream = fs.readFileSync(filePath, "utf-8");

    let count: number = 0;
    let totalArea: number = 0;
    let vertexArray: Array<Vertex> = [];

    fileStream.split(/\r?\n/).forEach(line => {
        const words = line.split(" ");
        if (isFacet(words)) count += 1;
        if (hasVertex(words)) {
            const x = parseFloat(words[words.length - 1]);
            const y = parseFloat(words[words.length - 2]);
            const z = parseFloat(words[words.length - 3]);
            vertexArray.push({x, y, z});
            if (isTriangle(vertexArray)) {
                const area = calculate3dArea(vertexArray[0], vertexArray[1], vertexArray[2]);
                totalArea += area;
                vertexArray = [];
            }
        }
    });

    return {count, totalArea};
  };

  const main = async () => {
    const stlTestData = processLineByLine(path.resolve(__dirname, "./assets/Test.stl"));
    const stlMoonData = processLineByLine(path.resolve(__dirname, "./assets/Moon.stl"));

    console.log({ stlTestData, stlMoonData });
  }

  main();
  
