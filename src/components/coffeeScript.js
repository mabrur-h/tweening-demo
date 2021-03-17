(function() {
    var Dial, dial;

    Dial = (function() {
        class Dial {
            constructor($context) {
                var knobOffset;

                // Callbacks
                this.onMouseDown = this.onMouseDown.bind(this);
                this.onMouseUp = this.onMouseUp.bind(this);
                this.onMouseMove = this.onMouseMove.bind(this);
                this.$context = $context;
                this.$knob = this.$context.find(".knob");
                this.$handle = this.$context.find(".handle");
                this.$progress = this.$context.find(".progress");
                this.$center = this.$context.find(".center");
                this.$textOutput = this.$center.find("span");
                this.ctx = this.$progress.get(0).getContext("2d");
                knobOffset = this.$knob.offset();
                this.elementPosition = {
                    x: knobOffset.left,
                    y: knobOffset.top
                };
                this.centerX = this.$progress.width() / 2;
                this.centerY = this.$progress.height() / 2;
                this.canvasSize = this.$progress.width();
                this.addEventListeners();
                this.draw();
                return;
            }

            addEventListeners() {
                this.$context.on("mousedown", this.onMouseDown);
                this.$context.on("mousemove", this.onMouseMove);
                document.body.on("mouseup", this.onMouseUp);
            }

            setDialPosition() {
                this.$knob.css({
                    transform: `rotate(${this.target}deg)`
                });
                this.$handle.css({
                    transform: `rotate(-${this.target}deg)`
                });
                this.draw();
            }

            draw() {
                var i, j, ref;
                this.$progress.get(0).height = this.canvasSize;



                this.$progress.get(0).width = this.canvasSize;
                this.ctx.save();
                this.ctx.translate(this.centerX, this.centerY);
                this.ctx.rotate((-90 * (Math.PI / 180)) - (Math.PI * 2 / this.steps));
                for (i = j = 0, ref = this.steps - 1; j <= ref; i = j += 1) {
                    this.ctx.beginPath();
                    this.ctx.rotate(Math.PI * 2 / this.steps);
                    this.ctx.lineWidth = 2;
                    this.ctx.lineTo(160, 0);
                    this.ctx.lineTo(170, 0);
                    if (i <= Math.floor(this.currentVal)) {
                        this.ctx.shadowBlur = 10;
                        this.ctx.strokeStyle = "#fff";
                        this.ctx.shadowColor = "#fff";
                        if (i > (this.steps * 0.75) && this.currentVal > (this.steps * 0.75)) {
                            this.ctx.strokeStyle = "#ff9306";
                            this.ctx.shadowColor = "#ff9306";
                        }
                        if (i > (this.steps * 0.88) && this.currentVal > (this.steps * 0.88)) {
                            this.ctx.strokeStyle = "#ff0606";
                            this.ctx.shadowColor = "#ff0606";
                        }
                    } else {
                        this.ctx.strokeStyle = "#444";
                        this.ctx.shadowBlur = 0;
                        this.ctx.shadowColor = "#fff";
                    }
                    this.ctx.stroke();
                }
                this.ctx.restore();
            }

            setMousePosition(event) {
                var atan, diff, target;
                this.mPos = {
                    x: event.pageX - this.elementPosition.x,
                    y: event.pageY - this.elementPosition.y
                };
                atan = Math.atan2(this.mPos.x - this.radius, this.mPos.y - this.radius);
                target = -atan / (Math.PI / 180) + 180;
                diff = Math.abs(target - this.target);
                if (diff < this.maxDiff && target < this.constraint) {
                    this.target = target;
                    this.currentVal = this.map(this.target, 0, 360, 0, this.steps);
                    this.setDialPosition();
                    this.updateOutput();
                }
            }

            updateOutput() {
                this.$textOutput.text(Math.round(this.currentVal));
            }

            onMouseDown(event) {
                this.mdown = true;
            }

            onMouseUp(event) {
                this.mdown = false;
            }

            onMouseMove(event) {
                if (this.mdown) {
                    this.setMousePosition(event);
                }
            }

            map(value, low1, high1, low2, high2) {
                return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
            }

        }

        Dial.prototype.raf = null;

        Dial.prototype.mdown = false;

        Dial.prototype.mPos = {
            x: 0,
            y: 0
        };

        Dial.prototype.elementPosition = {
            x: 0,
            y: 0
        };

        Dial.prototype.target = 0;

        Dial.prototype.steps = 60;

        Dial.prototype.radius = 150;

        Dial.prototype.maxDiff = 150;

        Dial.prototype.constraint = 360;

        Dial.prototype.currentVal = 0;

        return Dial;

    }).call(this);

    this.$dial = document.getElementsByClassName("dial");

    dial = new Dial(this.$dial);

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiPGFub255bW91cz4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBLElBQUEsRUFBQTs7RUFBTTtJQUFOLE1BQUEsS0FBQTtNQW9CRSxXQUFhLFNBQUEsQ0FBQTtBQUVmLFlBQUEsVUFBQTs7O1lBd0dFLENBQUEsa0JBQUEsQ0FBQTtZQUtBLENBQUEsZ0JBQUEsQ0FBQTtZQUtBLENBQUEsa0JBQUEsQ0FBQTtRQXBIYyxJQUFDLENBQUE7UUFFYixJQUFDLENBQUEsS0FBRCxHQUFTLElBQUMsQ0FBQSxRQUFRLENBQUMsSUFBVixDQUFlLE9BQWY7UUFDVCxJQUFDLENBQUEsT0FBRCxHQUFXLElBQUMsQ0FBQSxRQUFRLENBQUMsSUFBVixDQUFlLFNBQWY7UUFDWCxJQUFDLENBQUEsU0FBRCxHQUFhLElBQUMsQ0FBQSxRQUFRLENBQUMsSUFBVixDQUFlLFdBQWY7UUFDYixJQUFDLENBQUEsT0FBRCxHQUFXLElBQUMsQ0FBQSxRQUFRLENBQUMsSUFBVixDQUFlLFNBQWY7UUFDWCxJQUFDLENBQUEsV0FBRCxHQUFlLElBQUMsQ0FBQSxPQUFPLENBQUMsSUFBVCxDQUFjLE1BQWQ7UUFFZixJQUFDLENBQUEsR0FBRCxHQUFPLElBQUMsQ0FBQSxTQUFTLENBQUMsR0FBWCxDQUFlLENBQWYsQ0FBaUIsQ0FBQyxVQUFsQixDQUE2QixJQUE3QjtRQUVQLFVBQUEsR0FBYSxJQUFDLENBQUEsS0FBSyxDQUFDLE1BQVAsQ0FBQTtRQUViLElBQUMsQ0FBQSxlQUFELEdBQ0U7VUFBQSxDQUFBLEVBQUcsVUFBVSxDQUFDLElBQWQ7VUFDQSxDQUFBLEVBQUcsVUFBVSxDQUFDO1FBRGQ7UUFHRixJQUFDLENBQUEsT0FBRCxHQUFXLElBQUMsQ0FBQSxTQUFTLENBQUMsS0FBWCxDQUFBLENBQUEsR0FBbUI7UUFDOUIsSUFBQyxDQUFBLE9BQUQsR0FBVyxJQUFDLENBQUEsU0FBUyxDQUFDLE1BQVgsQ0FBQSxDQUFBLEdB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bUJBQ1osVUFBQSxHQUFZOzs7Ozs7RUErSGQsSUFBQyxDQUFBLEtBQUQsR0FBUyxDQUFBLENBQUUsT0FBRjs7RUFDVCxJQUFBLEdBQU8sSUFBSSxJQUFKLENBQVMsSUFBQyxDQUFBLEtBQVY7QUFsSlAiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBEaWFsXG4gIFxuICByYWY6IG51bGxcbiAgbWRvd246IGZhbHNlXG4gIFxuICBtUG9zOlxuICAgIHg6IDBcbiAgICB5OiAwXG4gIFxuICBlbGVtZW50UG9zaXRpb246XG4gICAgeDogMFxuICAgIHk6IDBcbiAgICBcbiAgdGFyZ2V0OiAwXG4gIHN0ZXBzOiA2MFxuICByYWRpdXM6IDE1MFxuICBtYXhEaWZmOiAxNTBcbiAgY29uc3RyYWludDogMzYwXG4gIGN1cnJlbnRWYWw6IDBcblxuICBjb25zdHJ1Y3RvcjogKEAkY29udGV4dCkgLT5cbiAgICBcbiAgICBAJGtub2IgPSBAJGNvbnRleHQuZmluZCBcIi5rbm9iXCJcbiAgICBAJGhhbmRsZSA9IEAkY29udGV4dC5maW5kIFwiLmhhbmRsZVwiXG4gICAgQCRwcm9ncmVzcyA9IEAkY29udGV4dC5maW5kIFwiLnByb2dyZXNzXCJcbiAgICBAJGNlbnRlciA9IEAkY29udGV4dC5maW5kIFwiLmNlbnRlclwiXG4gICAgQCR0ZXh0T3V0cHV0ID0gQCRjZW50ZXIuZmluZCBcInNwYW5cIlxuICAgIFxuICAgIEBjdHggPSBAJHByb2dyZXNzLmdldCgwKS5nZXRDb250ZXh0IFwiMmRcIlxuICAgIFxuICAgIGtub2JPZmZzZXQgPSBAJGtub2Iub2Zmc2V0KClcbiAgICAgICAgXG4gICAgQGVsZW1lbnRQb3NpdGlvbiA9XG4gICAgICB4OiBrbm9iT2Zmc2V0LmxlZnRcbiAgICAgIHk6IGtub2JPZmZzZXQudG9wXG4gICAgIFxuICAgIEBjZW50ZXJYID0gQCRwcm9ncmVzcy53aWR0aCgpLzJcbiAgICBAY2VudGVyWSA9IEAkcHJvZ3Jlc3MuaGVpZ2h0KCkvMiBcbiAgICBcbiAgICBAY2FudmFzU2l6ZSA9IEAkcHJvZ3Jlc3Mud2lkdGgoKVxuICAgIFxuICAgIEBhZGRFdmVudExpc3RlbmVycygpXG4gICAgQGRyYXcoKVxuICAgIHJldHVyblxuICBcblxuICBhZGRFdmVudExpc3RlbmVyczogKCkgLT5cbiAgICBAJGNvbnRleHQub24gXCJtb3VzZWRvd25cIiwgQG9uTW91c2VEb3duXG4gICAgQCRjb250ZXh0Lm9uIFwibW91c2Vtb3ZlXCIsIEBvbk1vdXNlTW92ZVxuICAgICQoXCJib2R5XCIpLm9uIFwibW91c2V1cFwiLCBAb25Nb3VzZVVwXG4gICAgcmV0dXJuXG4gXG4gIFxuICBzZXREaWFsUG9zaXRpb246IC0+XG4gICAgQCRrbm9iLmNzc1xuICAgICAgdHJhbnNmb3JtOiBcInJvdGF0ZSgje0B0YXJnZXR9ZGVnKVwiICBcbiAgICBcbiAgICBAJGhhbmRsZS5jc3NcbiAgICAgIHRyYW5zZm9ybTogXCJyb3RhdGUoLSN7QHRhcmdldH1kZWcpXCJcbiAgICBcbiAgICBAZHJhdygpXG4gICAgcmV0dXJuXG4gXG4gIFxuICBkcmF3OiAoKS0+XG4gICAgXG4gICAgQCRwcm9ncmVzcy5nZXQoMCkuaGVpZ2h0ID0gQGNhbnZhc1NpemVcbiAgICBAJHByb2dyZXNzLmdldCgwKS53aWR0aCA9IEBjYW52YXNTaXplXG4gICAgXG4gICAgQGN0eC5zYXZlKClcbiAgICBAY3R4LnRyYW5zbGF0ZSBAY2VudGVyWCwgQGNlbnRlcllcbiAgICBAY3R4LnJvdGF0ZSAoLTkwKihNYXRoLlBJLzE4MCkpLShNYXRoLlBJICogMiAvIEBzdGVwcylcbiAgICBcbiAgICBmb3IgaSBpbiBbMC4uQHN0ZXBzLTFdIGJ5IDFcbiAgICAgIEBjdHguYmVnaW5QYXRoKClcbiAgICAgIEBjdHgucm90YXRlKE1hdGguUEkgKiAyIC8gQHN0ZXBzKVxuICAgICAgXG4gICAgICBcbiAgICAgIEBjdHgubGluZVdpZHRoID0gMlxuICAgICAgQGN0eC5saW5lVG8oMTYwLCAwKVxuICAgICAgQGN0eC5saW5lVG8oMTcwLCAwKVxuICAgICAgaWYgaSA8PSBNYXRoLmZsb29yIEBjdXJyZW50VmFsXG4gICAgICAgIEBjdHguc2hhZG93Qmx1ciA9IDEwXG4gICAgICAgIEBjdHguc3Ryb2tlU3R5bGUgPSBcIiNmZmZcIlxuICAgICAgICBAY3R4LnNoYWRvd0NvbG9yID0gXCIjZmZmXCIgICAgIFxuICAgICAgICBpZiBpID4gKEBzdGVwcyowLjc1KSBhbmQgQGN1cnJlbnRWYWwgPiAoQHN0ZXBzKjAuNzUpXG4gICAgICAgICAgQGN0eC5zdHJva2VTdHlsZSA9IFwiI2ZmOTMwNlwiXG4gICAgICAgICAgQGN0eC5zaGFkb3dDb2xvciA9IFwiI2ZmOTMwNlwiXG4gICAgICAgIGlmIGkgPiAoQHN0ZXBzKjAuODgpIGFuZCBAY3VycmVudFZhbCA+IChAc3RlcHMqMC44OClcbiAgICAgICAgICBAY3R4LnN0cm9rZVN0eWxlID0gXCIjZmYwNjA2XCJcbiAgICAgICAgICBAY3R4LnNoYWRvd0NvbG9yID0gXCIjZmYwNjA2XCJcbiAgICAgIGVsc2VcbiAgICAgICAgQGN0eC5zdHJva2VTdHlsZSA9IFwiIzQ0NFwiXG4gICAgICAgIEBjdHguc2hhZG93Qmx1ciA9IDBcbiAgICAgICAgQGN0eC5zaGFkb3dDb2xvciA9IFwiI2ZmZlwiXG4gICAgICAgIFxuICAgICAgQGN0eC5zdHJva2UoKVxuICAgICAgICAgIFxuICAgIEBjdHgucmVzdG9yZSgpXG4gICAgcmV0dXJuXG5cbiAgXG4gIHNldE1vdXNlUG9zaXRpb246IChldmVudCkgLT5cbiAgICBAbVBvcyA9XG4gICAgICB4OiBldmVudC5wYWdlWCAtIEBlbGVtZW50UG9zaXRpb24ueFxuICAgICAgeTogZXZlbnQucGFnZVkgLSBAZWxlbWVudFBvc2l0aW9uLnlcbiAgICAgIFxuICAgIGF0YW4gPSBNYXRoLmF0YW4yIChAbVBvcy54IC0gQHJhZGl1cyksIEBtUG9zLnkgLSBAcmFkaXVzXG4gICAgdGFyZ2V0ID0gKC1hdGFuIC8gKE1hdGguUEkgLyAxODApICsgMTgwKVxuICBcbiAgICBkaWZmID0gTWF0aC5hYnMgdGFyZ2V0IC0gQHRhcmdldFxuICAgIFxuICAgIGlmIGRpZmYgPCBAbWF4RGlmZiBhbmQgdGFyZ2V0IDwgQGNvbnN0cmFpbnRcbiAgICAgIEB0YXJnZXQgPSB0YXJnZXRcbiAgICAgIEBjdXJyZW50VmFsID0gQG1hcChAdGFyZ2V0LCAwLCAzNjAsIDAsIEBzdGVwcylcbiAgICAgIFxuICAgICAgQHNldERpYWxQb3NpdGlvbigpXG4gICAgICBAdXBkYXRlT3V0cHV0KClcbiAgICByZXR1cm5cbiAgXG4gIHVwZGF0ZU91dHB1dDogKCktPlxuICAgIEAkdGV4dE91dHB1dC50ZXh0IE1hdGgucm91bmQoQGN1cnJlbnRWYWwpXG4gICAgcmV0dXJuXG4gIFxuICBcbiAgIyBDYWxsYmFja3NcbiAgb25Nb3VzZURvd246IChldmVudCkgPT5cbiAgICBAbWRvd24gPSB0cnVlXG4gICAgcmV0dXJuXG4gIFxuICBcbiAgb25Nb3VzZVVwOiAoZXZlbnQpID0+XG4gICAgQG1kb3duID0gZmFsc2VcbiAgICByZXR1cm5cbiAgXG4gIFxuICBvbk1vdXNlTW92ZTogKGV2ZW50KSA9PlxuICAgIGlmIEBtZG93biB0aGVuIEBzZXRNb3VzZVBvc2l0aW9uIGV2ZW50XG4gICAgcmV0dXJuXG4gIFxuICBtYXA6ICh2YWx1ZSwgbG93MSwgaGlnaDEsIGxvdzIsIGhpZ2gyKSAtPlxuICAgIHJldHVybiBsb3cyICsgKGhpZ2gyIC0gbG93MikgKiAodmFsdWUgLSBsb3cxKSAvIChoaWdoMSAtIGxvdzEpXG5cbiAgXG4gIFxuQCRkaWFsID0gJCBcIi5kaWFsXCJcbmRpYWwgPSBuZXcgRGlhbCBAJGRpYWxcbiJdfQ==
//# sourceURL=coffeescript
