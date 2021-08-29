const orbitHelper = require("./orbitHelper")
// @ponicode
describe("orbitHelper.LoadCars", () => {
    test("0", async () => {
        await orbitHelper.LoadCars()
    })
})

// @ponicode
describe("orbitHelper.LoadBrands", () => {
    test("0", async () => {
        await orbitHelper.LoadBrands()
    })
})

// @ponicode
describe("orbitHelper.saveRecord", () => {
    test("0", async () => {
        await orbitHelper.saveRecord(1, "Mon Aug 03 12:45:00")
    })

    test("1", async () => {
        await orbitHelper.saveRecord(-1, "Mon Aug 03 12:45:00")
    })

    test("2", async () => {
        await orbitHelper.saveRecord("sqlite", "2017-09-29T19:01:00.000")
    })

    test("3", async () => {
        await orbitHelper.saveRecord(0.0, "Mon Aug 03 12:45:00")
    })

    test("4", async () => {
        await orbitHelper.saveRecord(0.0, "01:04:03")
    })

    test("5", async () => {
        await orbitHelper.saveRecord(Infinity, undefined)
    })
})

// @ponicode
describe("orbitHelper.LoadBrandProducts", () => {
    test("0", async () => {
        await orbitHelper.LoadBrandProducts("192.168.1.5")
    })

    test("1", async () => {
        await orbitHelper.LoadBrandProducts("0.0.0.0")
    })

    test("2", async () => {
        await orbitHelper.LoadBrandProducts(undefined)
    })
})

// @ponicode
describe("orbitHelper.LoadCarItems", () => {
    test("0", async () => {
        await orbitHelper.LoadCarItems({ length: 0 })
    })

    test("1", async () => {
        await orbitHelper.LoadCarItems({ length: 5 })
    })

    test("2", async () => {
        await orbitHelper.LoadCarItems({ length: 3 })
    })

    test("3", async () => {
        await orbitHelper.LoadCarItems({ length: 10 })
    })

    test("4", async () => {
        await orbitHelper.LoadCarItems({ length: 1 })
    })

    test("5", async () => {
        await orbitHelper.LoadCarItems(undefined)
    })
})

// @ponicode
describe("orbitHelper.LoadBrandItems", () => {
    test("0", async () => {
        await orbitHelper.LoadBrandItems({ length: 10 })
    })

    test("1", async () => {
        await orbitHelper.LoadBrandItems({ length: 2 })
    })

    test("2", async () => {
        await orbitHelper.LoadBrandItems({ length: 5 })
    })

    test("3", async () => {
        await orbitHelper.LoadBrandItems({ length: 1 })
    })

    test("4", async () => {
        await orbitHelper.LoadBrandItems({ length: 3 })
    })

    test("5", async () => {
        await orbitHelper.LoadBrandItems({ length: Infinity })
    })
})
