describe("PopupWidget", function() {
    it("Draw on success returns true", function() {
        const result = popupWidget.draw("This is a success message", "success");
        expect(result).toBe(true);
    });

    it("Draw on failed returns false", function() {
        const result = popupWidget.draw("This is a success message", "failed");
        expect(result).toBe(false);
    });

    it("Draw on wrong messageType returns false", function() {
        const result = popupWidget.draw("This is a success message", "nothing");
        expect(result).toBe(undefined);
    });
});